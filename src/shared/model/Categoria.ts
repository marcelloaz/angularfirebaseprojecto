import { Milestone } from './milestone';
import { UserPermission } from './user-permission';
import { Produto } from './produto';

export class Categoria {
  id: string;
  nome: string;
  produtos: Produto[];
}
