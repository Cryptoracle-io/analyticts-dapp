
function parseDate(input) {
    var parts = input.split('/');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function filterReleasedCollections(collections) {
    const currentDate = new Date();
    return collections.filter(collection => {
        const releaseDate = parseDate(collection.relaseDate);
        return releaseDate <= currentDate;
    });
}

function compareAndAdjustLists(list1, list2) {
    const targetLength = list2.length ;

    if (list1.length > targetLength) {
        // If list1 is longer, we shorten it to match the target length
        list1 = list1.slice(0, targetLength);
    }

    // If list1 is shorter or equal to target length, we don't need to do anything

    return list1; // Return the possibly adjusted list1
}


const featuredNFTDataList = [
    {
        id: 1,
        img: "img/extra/ps2.png",
        collectionID:"partner",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
    },
    {
        id: 2,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
    },
    {
        id: 3,
        img: "img/extra/ps4.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    {
        id: 4,
        img: "img/extra/ps5.png",
        likes: "37.41k",
        title: "",
        category: "Artwork",
        highest: "",
        price: "",
        real: false,
    },
    
];
let featuredCollectionsList = [
    {
        id: 1,
        collectionID: "bnehedz-by-bonehedznear",
        relaseDate: "11/03/2023",
    },
    {
        id: 2,
        collectionID: "misfits.tenk.near",
        relaseDate: "11/03/2023",
    },
    {
        id: 3,
        collectionID: "partner",
        img: "img/extra/beetogether.png",
        title: "BeeTogether",
        web: "bee-together.org",
        twitter: "beetogether_org",
        description: "We raise funds through selling NFTs for non-profit-organisations!",
        relaseDate: "11/03/2023",
    },
    {
        id: 4,
        collectionID: "social-impact-collection-by-rubenzmartnear",
        relaseDate: "19/07/2023",
    }, 
    {
        id: 5,
        collectionID: "frames-of-hope-by-monosidnear",
        relaseDate: "20/07/2023",
    },
    {
        id: 6,
        collectionID: "artrific-by-eliaszinasnear",
        relaseDate: "21/07/2023",
    },
    {
        id: 7,
        collectionID: "head-space-by-krucekonceptnear",
        relaseDate: "22/07/2023",
    },
    {
        id: 8,
        collectionID: "bee-home-by-elvatar02near",
        relaseDate: "24/07/2023",
    },
    {
        id: 6,
        collectionID: "oh-sister-my-sister-by-joanadarcnear",
        relaseDate: "25/07/2023",
    },
    {
        id: 7,
        collectionID: "chibee-by-walolabsnear",
        relaseDate: "26/07/2023",
    },
    {
        id: 9,
        collectionID: "bee-collections-by-rubenzmartnear",
        relaseDate: "27/07/2023",
    },
    {
        id: 10,
        collectionID: "bee-near-by-rubenzmartnear",
        relaseDate: "28/07/2023",
    },
    {
        id: 11,
        collectionID: "mythology-goddesses-by-whaattheartnear",
        relaseDate: "29/07/2023",
    },
    {
        id: 12,
        collectionID: "pixe-bees-by-zetsue001near",
        relaseDate: "31/07/2023",
    },

];

const featuredCollections = filterReleasedCollections(featuredCollectionsList);
const featuredNFTData = compareAndAdjustLists(featuredNFTDataList, featuredCollections);
export { featuredNFTData, featuredCollections };