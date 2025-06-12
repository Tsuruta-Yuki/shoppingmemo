package btc8.shoppingmemo

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id


@Entity
data class Users(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @Column(nullable = false)
    val username: String,


    )

@Entity
data class Lists(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @Column(nullable = false)
    val ownerID: Long,

    @Column(nullable = false)
    val title: String,

    )

@Entity
data class Items(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @Column(nullable = false)
    val listID: Long,

    @Column(nullable = false)
    val itemName: String,

    @Column(nullable = false)
    val number: Long,

    )


@Entity
data class Shared(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,

    @Column(nullable = false)
    val listID: Long,

    @Column(nullable = false)
    val sharedUserID: Long,

    )