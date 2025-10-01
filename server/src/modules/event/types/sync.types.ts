export enum SyncStrategy {
    MERGE_PREFER_TEMPRA = 'merge_prefer_tempra',
    MERGE_PREFER_GOOGLE = 'merge_prefer_google',
    KEEP_BOTH = 'keep_both',
}

export enum ConflictReason {
    DUPLICATE = 'duplicate',
    TIME_OVERLAP = 'time_overlap',
    MISSING_MAPPING = 'missing_mapping',
}

export enum ConflictResolution {
    PREFER_TEMPRA = 'prefer_tempra',
    PREFER_GOOGLE = 'prefer_google',
    KEEP_BOTH = 'keep_both',
    MANUAL_MERGE = 'manual_merge',
    DELETE_BOTH = 'delete_both',
    IGNORE = 'ignore',
}

export interface SyncConflict {
    tempraEventId?: string;
    googleEventId?: string;
    reason: ConflictReason;
    tempraEvent?: any;
    googleEvent?: any;
    resolution?: string;
    resolved?: boolean;
    createdAt?: Date;
    resolvedAt?: Date;
}

export interface InitialSyncResult {
    totalGoogleEvents: number;
    totalTempraEvents: number;
    imported: number;
    conflicts: SyncConflict[];
    errors: string[];
}

export interface SyncResult {
    success: boolean;
    syncedToGoogle: boolean;
    googleEventId?: string;
    error?: string;
}

export interface SyncStatus {
    connectedToGoogle: boolean;
    isSyncEnabled: boolean;
    canSync: boolean;
    lastSyncAt?: Date;
}
