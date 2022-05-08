const { gql } = require("apollo-server-express");

const typeDefs = gql`
    scalar Date

    type attributes {
        key: String
        value: String
    }

    type NFTmetadata {
        name: String
        description: String
        coverImage: String
        image: String
        external_url: String
        fee: Float
        fee_recipent: String
    }

    type metadata {
        image: String
        image_data: String
        external_url: String
        description: String
        name: String
        attributes: [attributes]
        background_color: String
        animation_url: String
        youtube_url: String
    }

    type marketdata {
        prices: [Int]
        owners: [String]
        bidders: [String]
    }

    type item {
        owner: String
        metadata: metadata
        marketdata: marketdata
    }

    type NFTs {
        address: String
        metadata: NFTmetadata
        items: [item]
    }

    type NFTPRICE {
        collectionAddress: String
        prices: [Float]
    }

    type User {
        address: String
        name: String
        bio: String
        email: String
        image: String
        coverimage: String
        backgroundimage: String
        follow: Int
        description: String
    }

    type UserImage {
        address: String
        image: String
    }

    type Query {
        getAllNFTs: [item]
        getCollectionNFTs: [NFTs]
        getNFTPrice: [NFTPRICE]
        getUserInfo(account: String): User
        getUserImages: [UserImage]
    }
`;

module.exports = { typeDefs };
