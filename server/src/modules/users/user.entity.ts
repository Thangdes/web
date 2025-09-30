import { StatusEntity } from '../../common/interfaces/base-entity.interface';

export interface User extends StatusEntity {
  email: string;
  username: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  is_verified: boolean;
}

