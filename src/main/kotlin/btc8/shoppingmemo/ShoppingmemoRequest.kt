package btc8.shoppingmemo

data class UsersRequest(
    val username: String,
)


data class ListsRequest(
    val ownerID: Long,
    val title: String,
)

data class ItemsRequest(
    val listID: Long,
    val itemName: String,
    val number: Long,
)

data class SharedRequest(
    val listID: Long,
    val sharedUserID: Long,
)