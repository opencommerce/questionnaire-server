import {DefaultCrudRepository, juggler, DataObject, Options} from '@loopback/repository';
import {User} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {PasswordHasher} from '../utilities';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @inject('utilities.PasswordHasher') private passwordHasher: PasswordHasher
) {
    super(User, dataSource);
  }

  create(entity: DataObject<User>, options?: Options): Promise<User> {
      const hash = this.passwordHasher.hash(entity.password);
      entity.password = hash;
    return super.create(entity, options);
  }
}
