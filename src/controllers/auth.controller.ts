import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/auth', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @get('/auth/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/auth', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/auth', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/auth/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/auth/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/auth/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/auth/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
