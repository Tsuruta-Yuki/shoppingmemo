package btc8.shoppingmemo

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UsersRepository : CrudRepository<Users, Long>
interface ListsRepository : CrudRepository<Lists, Long>
interface ItemsRepository : CrudRepository<Items, Long>
interface SharedRepository : CrudRepository<Shared, Long>
