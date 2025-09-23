# Calendar Assistant — API Specification

Cập nhật: 2025-09-23
Phạm vi: Backend NestJS, tích hợp Google OAuth2, Google Calendar API, Google Gemini API (Generative AI), Webhook Notifications, Slack Bot.

## 1) Mục tiêu
- Trợ lý lịch cá nhân/doanh nghiệp: tạo/sửa/xoá/sắp xếp/summarize sự kiện, đề xuất thởi gian rảnh, đọc yêu cầu ngôn ngữ tự nhiên và chuyển thành hành động lịch.
- Tích hợp với Google: đồng bộ hoá event đa chiều, nhận thông báo thay đổi theo thởi gian thực.
- Sử dụng Gemini để hiểu ngôn ngữ tự nhiên, tóm tắt và tạo mô tả sự kiện.
- Tích hợp với Slack: nhận lệnh từ Slack, tạo sự kiện, gửi thông báo.

## 2) Kiến trúc tổng quan
- Backend: NestJS (REST + Webhook + Background jobs)
- OAuth2: Google Identity / Google OAuth 2.0 (Authorization Code + Refresh Token)
- APIs bên ngoài: Google Calendar API, Google Drive (tuỳ chọn để đính kèm), Google Gemini API
- DB: lưu token, user profile, mapping calendar -> user, webhook channels
- Queue/Jobs (tuỳ chọn): BullMQ / Redis để xử lý đồng bộ hoá và webhook
- Slack Bot: tích hợp với Slack để nhận lệnh và gửi thông báo.

## 3) Biến môi trường (ENV)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_OAUTH_REDIRECT_URI (ví dụ: https://your.api/auth/google/callback)
- GOOGLE_CALENDAR_WEBHOOK_VERIFICATION_TOKEN (tuỳ chọn ký xác thực riêng)
- GEMINI_API_KEY
- GEMINI_MODEL (ví dụ: gemini-1.5-pro-latest)
- APP_BASE_URL (ví dụ: https://your.api)
- JWT_SECRET (nếu backend dùng JWT phiên nội bộ)
- DATABASE_URL (Postgres/MySQL/Mongo...)
- REDIS_URL (nếu dùng queue)
- SLACK_CLIENT_ID
- SLACK_CLIENT_SECRET
- SLACK_SIGNING_SECRET
- SLACK_BOT_TOKEN
- SLACK_APP_ID (tuỳ chọn)
- SLACK_REDIRECT_URI (ví dụ: https://your.api/auth/slack/callback)
- SLACK_VERIFICATION_TOKEN (tuỳ chọn kế thừa; ưu tiên dùng chữ ký HMAC)

## 4) Phân quyền & Bảo mật
- OAuth2 của Google: yêu cầu phạm vi tối thiểu cần thiết.
- Token management: lưu refresh_token an toàn, mã hoá khi cần.
- Webhook verify: xác thực header, secret, hoặc token query.
- Rate limit, request size limit, input validation (class-validator)
- Logging và audit trail cho thay đổi sự kiện quan trọng.
- Xác thực chữ ký Slack với headers `X-Slack-Signature` và `X-Slack-Request-Timestamp`.

## 5) Phạm vi (Scopes) Google cần
- https://www.googleapis.com/auth/userinfo.email (để lấy email)
- https://www.googleapis.com/auth/userinfo.profile (tuỳ chọn)
- https://www.googleapis.com/auth/calendar (đọc/ghi toàn quyền) — hoặc thu hẹp:
  - https://www.googleapis.com/auth/calendar.events
  - https://www.googleapis.com/auth/calendar.readonly

Tối ưu quyền: bắt đầu với `calendar.events` nếu chỉ thao tác sự kiện; thêm `readonly` nếu chỉ đọc.

## 6) Luồng OAuth2 (Google)
1. Client gọi: GET /auth/google
2. Người dùng chấp thuận scope tại Google Consent
3. Google callback về: GET /auth/google/callback?code=...
4. Backend trao đổi code lấy access_token + refresh_token, lưu DB
5. Trả JWT phiên nội bộ (tuỳ chọn) cho frontend

## 7) Endpoints Backend (NestJS)

Base path gợi ý: `/api/v1`

- Auth
  - GET `/auth/google` — Redirect sang Google OAuth consent
  - GET `/auth/google/callback` — Xử lý code, lưu token, chuyển hướng về FE
  - GET `/auth/me` — Thông tin người dùng hiện tại (dựa trên JWT nội bộ)
  - POST `/auth/logout` — Revoke session (tuỳ chọn revoke token Google)
  - GET `/auth/slack` — Redirect sang Slack OAuth (user/bot install)
  - GET `/auth/slack/callback` — Nhận code, trao đổi access token, lưu workspace/team

- Calendar Connections
  - POST `/calendar/webhook/subscribe` — Đăng ký watch thay đổi cho calendar hoặc events
  - POST `/calendar/webhook/stop` — Huỷ kênh watch (channels.stop)
  - POST `/calendar/webhook/notify` — Webhook endpoint nhận push notifications từ Google

- Events CRUD
  - GET `/calendar/calendars` — Liệt kê calendars khả dụng (primary, shared)
  - GET `/calendar/events` — Liệt kê events (hỗ trợ timeMin, timeMax, pageToken)
  - POST `/calendar/events` — Tạo event
  - GET `/calendar/events/:id` — Chi tiết event
  - PATCH `/calendar/events/:id` — Cập nhật event
  - DELETE `/calendar/events/:id` — Xoá event

- Availability & Scheduling
  - POST `/calendar/availability` — Check free/busy nhiều người (dựa trên FreeBusy API)
  - POST `/calendar/schedule` — Tạo meeting theo ràng buộc (attendees, duration, window)

- Gemini Assistant
  - POST `/assistant/interpret` — Hiểu ngôn ngữ tự nhiên -> intent cấu trúc (dùng Gemini)
  - POST `/assistant/summarize` — Tóm tắt danh sách events hoặc một event
  - POST `/assistant/compose` — Tạo mô tả/nội dung mời họp dựa trên bối cảnh

- Slack Integration
  - POST `/slack/events` — Slack Events API endpoint (URL verification + events)
  - POST `/slack/commands` — Slash commands endpoint (ví dụ `/calendar`, `/schedule`)
  - POST `/slack/interactivity` — Endpoint cho interactive components (buttons, modals)

- Realtime (tuỳ chọn)
  - GET `/ws` — WebSocket gateway để push cập nhật UI (khi có webhook đến)

### 7.1) Định nghĩa Payloads

- POST `/calendar/events`
  Request:
  ```json
  {
    "calendarId": "primary",
    "summary": "Weekly Sync",
    "description": "Discuss sprint updates",
    "start": { "dateTime": "2025-09-24T09:00:00Z" },
    "end": { "dateTime": "2025-09-24T09:30:00Z" },
    "attendees": [
      { "email": "a@example.com" },
      { "email": "b@example.com" }
    ],
    "location": "Google Meet",
    "conferenceData": {
      "createRequest": { "requestId": "uuid-1234", "conferenceSolutionKey": { "type": "hangoutsMeet" } }
    }
  }
  ```
  Response (201):
  ```json
  {
    "id": "eventId",
    "htmlLink": "https://www.google.com/calendar/event?eid=...",
    "status": "confirmed",
    "hangoutLink": "https://meet.google.com/xxx-xxxx-xxx",
    "start": { "dateTime": "2025-09-24T09:00:00Z" },
    "end": { "dateTime": "2025-09-24T09:30:00Z" },
    "attendees": [ { "email": "a@example.com", "responseStatus": "needsAction" } ]
  }
  ```

- POST `/calendar/availability`
  Request:
  ```json
  {
    "timeMin": "2025-09-24T00:00:00Z",
    "timeMax": "2025-09-25T00:00:00Z",
    "timeZone": "UTC",
    "items": [
      { "id": "primary" },
      { "id": "user2@example.com" }
    ]
  }
  ```
  Response:
  ```json
  {
    "calendars": {
      "primary": { "busy": [ { "start": "2025-09-24T09:00:00Z", "end": "2025-09-24T09:30:00Z" } ] },
      "user2@example.com": { "busy": [] }
    }
  }
  ```

- POST `/assistant/interpret`
  Request:
  ```json
  { "query": "Đặt cuộc họp với An và Bình chiều mai khoảng 30 phút" }
  ```
  Response (intent chuẩn hoá):
  ```json
  {
    "intent": "CREATE_EVENT",
    "entities": {
      "attendees": ["an@example.com", "binh@example.com"],
      "durationMinutes": 30,
      "windowStart": "2025-09-24T12:00:00+07:00",
      "windowEnd": "2025-09-24T18:00:00+07:00"
    }
  }
  ```

## 8) Google Calendar API — endpoints dự kiến sử dụng
Tài liệu: https://developers.google.com/calendar/api/v3/reference

- Events
  - `GET /calendars/{calendarId}/events` — liệt kê
  - `POST /calendars/{calendarId}/events` — tạo
  - `GET /calendars/{calendarId}/events/{eventId}` — chi tiết
  - `PATCH /calendars/{calendarId}/events/{eventId}` — cập nhật
  - `DELETE /calendars/{calendarId}/events/{eventId}` — xoá
  - `POST /calendars/{calendarId}/events/watch` — đăng ký push notification

- FreeBusy
  - `POST /freeBusy` — kiểm tra bận/rảnh

- Channels
  - `POST /channels/stop` — dừng kênh watch

- Calendars (metadata)
  - `GET /users/me/calendarList` — danh sách calendars người dùng

- Phần mở rộng
  - ConferenceData (Google Meet): yêu cầu `conferenceDataVersion=1`

## 9) Webhook Push Notifications (Google Calendar)
- Đăng ký watch: gọi `events.watch` hoặc `calendarList.watch`
- Backend chuẩn bị endpoint: `POST /calendar/webhook/notify`
- Headers quan trọng từ Google:
  - `X-Goog-Channel-ID`
  - `X-Goog-Resource-ID`
  - `X-Goog-Resource-State` (exists, sync, notExists)
  - `X-Goog-Message-Number`
- Bảo mật:
  - Dùng `token` tuỳ ý khi đăng ký watch (Google sẽ gửi lại trong header `X-Goog-Channel-Token`)
  - Hoặc ký HMAC riêng và kiểm tra trong middleware
- Xử lý:
  - Khi nhận notify, gọi lại `events.list` với `syncToken`/`updatedMin` để đồng bộ

## 10) Google Gemini API — sử dụng
Tài liệu: https://ai.google.dev/

- Mục tiêu sử dụng:
  - Chuyển ngôn ngữ tự nhiên -> intent cấu trúc (function calling / JSON schema)
  - Tóm tắt danh sách sự kiện (ngày/tuần)
  - Viết nội dung email mời họp, mô tả agenda

- Model đề xuất: `gemini-1.5-pro` hoặc `gemini-1.5-flash` (nhanh hơn)

- Endpoint (REST, ví dụ):
  - `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
  - Header: `Authorization: Bearer {GEMINI_API_KEY}`, `Content-Type: application/json`

- Prompting (ví dụ interpret):
  ```json
  {
    "contents": [
      {
        "parts": [
          {"text": "Bạn là trợ lý lập lịch. Chuyển câu người dùng thành JSON với intent và entities..."},
          {"text": "Câu: Đặt cuộc họp với An và Bình chiều mai khoảng 30 phút"}
        ]
      }
    ],
    "generationConfig": {
      "temperature": 0.2,
      "responseMimeType": "application/json"
    }
  }
  ```

- Đầu ra mong muốn (ví dụ):
  ```json
  {
    "intent": "CREATE_EVENT",
    "entities": {
      "attendees": ["an@example.com", "binh@example.com"],
      "durationMinutes": 30,
      "window": {"start": "tomorrow afternoon", "timezone": "+07:00"}
    }
  }
  ```

- Lưu ý an toàn và chi phí:
  - Thiết lập rate-limit và timeouts
  - Kiểm soát nội dung đầu ra, validate JSON theo schema

## 11) Xử lý lịch làm việc (Scheduling Logic)
- Quy trình gợi ý slot:
  1) Dùng Gemini để trích tuần/thời gian mong muốn
  2) Gọi FreeBusy với attendees để lấy khoảng bận
  3) Tìm slot trống theo duration và timezone
  4) Tạo event hoặc đề xuất danh sách thời gian cho người dùng chọn

## 12) Mã hoá dữ liệu & Quy định quyền riêng tư
- Không lưu nội dung nhạy cảm lâu dài
- Xoá token khi người dùng ngắt kết nối
- Mã hoá ở trạng thái nghỉ (at-rest) và khi truyền (in-transit)

## 13) Định nghĩa lỗi chuẩn
- 400 Bad Request — thiếu trường, sai định dạng thởi gian
- 401 Unauthorized — chưa đăng nhập/không có token hợp lệ
- 403 Forbidden — thiếu scope phù hợp
- 404 Not Found — không tìm thấy event/calendars
- 409 Conflict — idempotency conflict
- 429 Too Many Requests — vượt ngưỡng rate-limit
- 500 Internal Server Error — lỗi bất định

Cấu trúc lỗi JSON:
```json
{
  "error": {
    "code": 400,
    "message": "timeMin phải nhỏ hơn timeMax",
    "details": [
      { "field": "timeMin", "issue": "INVALID_RANGE" }
    ]
  }
}
```

## 13.1) Chuẩn cấu trúc phản hồi (Response Envelope)
- Mục đích: Chuẩn hoá format trả về để client dễ xử lý, log và theo dõi truy vết.
- Tất cả responses từ Backend (trừ một số endpoint đặc thù như OAuth callback hoặc Slack URL verification) sẽ được bọc trong envelope sau:

Schema tổng quát:
```json
{
  "time": "2025-09-23T11:33:00Z",
  "requestID": "3f0b8fbe-1d2a-4d1e-9d9d-2f4a2f8e8a21",
  "status": "success",
  "message": "OK",
  "data": {}
}
```

Định nghĩa trường:
- `time`: Thời điểm phản hồi theo ISO 8601, UTC (ví dụ: `2025-09-23T11:33:00Z`).
- `requestID`: UUID v4 đại diện cho yêu cầu, tái sử dụng từ header/context nếu có.
- `status`: `success` | `error`.
- `message`: Mô tả ngắn gọn; bắt buộc khi `status = error`, tuỳ chọn khi `success`.
- `data`: Object hoặc Array chứa nội dung trả về; có thể là `null` nếu không có dữ liệu.

Lưu ý đặt tên trường:
- Thống nhất sử dụng `message` (chính tả chuẩn). Nếu có client cũ đang dùng nhầm khoá `messsagfe`, hãy cập nhật client sang `message`.

Ví dụ (success):
```json
{
  "time": "2025-09-23T11:33:00Z",
  "requestID": "b9f2b0e2-6d24-4f3f-b1b5-0e2c9a3c8d11",
  "status": "success",
  "message": "Created",
  "data": {
    "id": "eventId",
    "htmlLink": "https://www.google.com/calendar/event?eid=...",
    "status": "confirmed"
  }
}
```

Ví dụ (error):
```json
{
  "time": "2025-09-23T11:35:00Z",
  "requestID": "c1e4a9c2-5f6a-4a22-9c77-0f2b4d6a8e99",
  "status": "error",
  "message": "timeMin phải nhỏ hơn timeMax",
  "data": {
    "error": {
      "code": 400,
      "details": [
        { "field": "timeMin", "issue": "INVALID_RANGE" }
      ]
    }
  }
}
```

Gợi ý triển khai NestJS:
- Tạo `ResponseInterceptor` để bọc dữ liệu vào envelope.
- Truyền `requestID` từ middleware (ví dụ: lấy từ header `X-Request-ID` hoặc tự sinh UUID per-request).
- Với lỗi, sử dụng `ExceptionFilter` để chuẩn hoá `status=error` và nội dung `message`, `data.error`.

## 14) Idempotency & Pagination
- Idempotency-Key header cho POST tạo event để tránh trùng khi retry
- Pagination: `pageToken` theo chuẩn Google khi liệt kê events

## 15) Kiểm thử & Môi trường
- Local: dùng ngrok để nhận webhook
- Staging/Prod: cấu hình domain HTTPS, đảm bảo IP cho Google có thể gọi
- Postman/Insomnia collection cho các endpoints

## 16) Tiện ích mở rộng (tuỳ chọn)
- Microsoft Graph Calendar (Outlook) để đa nền tảng
- Google People API để map tên -> email
- Slack/Teams webhook để gửi thông báo nhắc nhở

## 17) Tích hợp Slack Bot
Tài liệu Slack: https://api.slack.com/

### 17.1) OAuth & Quyền (Scopes)
- Luồng OAuth: `GET /auth/slack` -> người dùng chấp thuận -> `GET /auth/slack/callback?code=...`
- Token: Lưu `access_token` loại bot (xoxb-), và thông tin workspace (team_id, team_name, bot_user_id)
- Scopes gợi ý:
  - `commands` — dùng Slash commands
  - `chat:write` — gửi message
  - `chat:write.public` — gửi vào channel công khai (nếu cần)
  - `channels:read`, `groups:read`, `im:read`, `mpim:read` — đọc metadata kênh (tuỳ chọn)
  - `users:read.email` — map tên -> email (tuỳ chọn, có thể dùng Google People API thay thế)

### 17.2) Endpoints Backend (NestJS)
- `GET /auth/slack` — Redirect tới Slack OAuth (client_id, scopes, redirect_uri)
- `GET /auth/slack/callback` — Lấy `code`, gọi `oauth.v2.access`, lưu token
- `POST /slack/events` — Nhận Events API
  - Khi URL verification: phản hồi `{ "challenge": "..." }`
  - Sự kiện quan trọng: `app_mention`, `message.im`, `member_joined_channel`
  - Xử lý `app_mention`: chuyển tin nhắn -> `/assistant/interpret` -> hành động lịch -> phản hồi
- `POST /slack/commands` — Nhận Slash commands (form-encoded)
  - Ví dụ lệnh: `/calendar`, `/schedule`, `/availability`
  - Phản hồi ephemeral 200 ms đầu (ack), sau đó dùng `response_url` để trả kết quả async
- `POST /slack/interactivity` — Nhận actions từ buttons, select, modals
  - Dùng để xác nhận thởi gian, chọn slot, hoặc cập nhật event

### 17.3) Bảo mật & Xác thực chữ ký
- Xác minh chữ ký Slack với headers `X-Slack-Signature` và `X-Slack-Request-Timestamp`
- Tạo base string: `v0:{timestamp}:{rawBody}` và HMAC SHA256 với `SLACK_SIGNING_SECRET`
- Từ chối nếu lệch thởi gian > 5 phút (replay attack)

### 17.4) Slash Commands — ví dụ payload
Content-Type: `application/x-www-form-urlencoded`
```
token=...&team_id=T123&team_domain=acme&channel_id=C123&channel_name=general&user_id=U123&user_name=an&command=%2Fcalendar&text=Hi lawaka mai lafa 15 ph fat&response_url=https://hooks.slack.com/commands/...
```
Xử lý:
1) Parse `text`, gọi `/assistant/interpret` (Gemini) để suy luận intent
2) Nếu cần tìm slot: gọi `/calendar/availability`
3) Trả message ephemeral (ack) + tiếp tục trả kết quả qua `response_url`

### 17.5) Interactive Flow (Blocks & Modals)
- Gửi Block Kit với danh sách slot gợi ý (buttons)
- Khi người dùng click chọn slot -> `POST /slack/interactivity` -> tạo event qua `/calendar/events`
- Modal tạo sự kiện: trigger `views.open` với form (summary, attendees, duration)

Ví dụ message (rút gọn):
```json
{
  "blocks": [
    {"type": "section", "text": {"type": "mrkdwn", "text": "Đề xuất thởi gian:"}},
    {"type": "actions", "elements": [
      {"type": "button", "text": {"type": "plain_text", "text": "09:00-09:30"}, "value": "2025-09-24T09:00:00Z/2025-09-24T09:30:00Z"}
    ]}
  ]
}
```

### 17.6) Gửi tin nhắn từ server
- Sử dụng `chat.postMessage` với `SLACK_BOT_TOKEN`
- Tiêu chí: thread_ts để thread hoá, ephemeral (chat.postEphemeral) khi cần

### 17.7) Mapping Slack -> Calendar Assistant
- `app_mention` hoặc DM: ngôn ngữ tự nhiên -> `/assistant/interpret`
- Slash `/schedule`: tạo meeting theo attendees + duration + window
- Nút xác nhận: tạo event -> trả lại link event

### 17.8) Retry & Rate limit
- Slack retry qua header `X-Slack-Retry-Num`, `X-Slack-Retry-Reason`
- Đảm bảo idempotency cho `/slack/events` và `/slack/interactivity` (dựa trên `event_id`/`payload.trigger_id`)

### 17.9) Cấu hình App Slack
- Bật: OAuth & Permissions, Event Subscriptions, Interactivity & Shortcuts, Slash Commands
- URL trỏ tới: `/auth/slack/callback`, `/slack/events`, `/slack/interactivity`, `/slack/commands`

### 17.10) Lưu ý bảo mật
- Không log raw tokens, mask PII
- Hạn chế scope tối thiểu cần thiết
- Rotate tokens khi nghi ngờ lộ lọt

---
Checklist bổ sung Slack:
- [ ] Tạo Slack App, lấy `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`
- [ ] Cấu hình scopes: `commands`, `chat:write`, ...
- [ ] Đặt Redirect URL: `/auth/slack/callback`
- [ ] Đặt Event Request URL: `/slack/events`, Interactivity: `/slack/interactivity`, Slash: `/slack/commands`
- [ ] Viết middleware verify chữ ký Slack
- [ ] Thử slash command `/schedule` end-to-end
