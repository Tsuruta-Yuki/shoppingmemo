package btc8.shoppingmemo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
public class ShoppingmemoController(
    @Autowired private val userrepository: UsersRepository,
    @Autowired private val listrepository: ListsRepository,
    @Autowired private val itemrepository: ItemsRepository,
    @Autowired private val sharedrepository: SharedRepository
) {
    //Getメソッド-----------------------------------------------------
    @GetMapping("/api/users")
    fun getUsers(): List<Users> {
        val users = userrepository.findAll()
        return users.toList()
    }

    @GetMapping("/api/users/{name}")
    fun getoneUsers(@PathVariable name: String): List<Users> {
        val users = userrepository.findAll().filter { it.username == name }
        return users.toList()
    }

    @GetMapping("/api/lists")
    fun getLists(): List<Lists> {
        val lists = listrepository.findAll()
        return lists.toList()
    }

    @GetMapping("/api/lists/{ownerID}")
    fun getoneUsers(@PathVariable ownerID: Long): List<Lists> {
        val lists = listrepository.findAll().filter { it.ownerID == ownerID }
        return lists.toList()
    }


    @GetMapping("/api/items")
    fun getItems(): List<Items> {
        val items = itemrepository.findAll()
        return items.toList()
    }

    @GetMapping("/api/items/{listID}")
    fun getoneitem(@PathVariable listID: Long): List<Items> {
        val items = itemrepository.findAll().filter { it.listID == listID }
        return items.toList()
    }

    @GetMapping("/api/shared")
    fun getShared(): List<Shared> {
        val shared = sharedrepository.findAll()
        return shared.toList()
    }


    //Postメソッド-----------------------------------------------------
    @PostMapping("/api/users")
    fun postUsers(@RequestBody user: UsersRequest) {
        val entity = Users(username = user.username)
        userrepository.save(entity)
    }

    @PostMapping("/api/lists")
    fun postLists(@RequestBody list: ListsRequest) {
        val entity = Lists(
            ownerID = list.ownerID,
            title = list.title
        )
        listrepository.save(entity)
    }

    @PostMapping("/api/items")
    fun postItems(@RequestBody item: ItemsRequest) {
        val entity = Items(
            listID = item.listID,
            itemName = item.itemName,
            number = item.number,
        )
        itemrepository.save(entity)
    }

    @PostMapping("/api/shared")
    fun postShared(@RequestBody shared: SharedRequest) {
        val entity = Shared(
            listID = shared.listID,
            sharedUserID = shared.sharedUserID,
        )
        sharedrepository.save(entity)
    }

    //Deleteメソッド-----------------------------------------------------
    @DeleteMapping("/api/lists/{id}")
    fun deleteonelist(@PathVariable id: Long) {
        listrepository.deleteById(id);
    }

    @DeleteMapping("/api/items/{id}")
    fun deleteoneitem(@PathVariable id: Long) {
        itemrepository.deleteById(id);
    }


}