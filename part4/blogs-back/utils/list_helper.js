const dummy = (array) => {
    return Array.isArray(array)
        ? 1
        : null
}

const totalLikes = (array) => {
    if (array.length === 0) {
        return 0
    }
    if (array.length === 1) {
        return array[0].likes}

    const reducer = (sum, item) => {
        return sum + item
    }
    const likes = array.map(blogs => blogs.likes)
    
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let blogMostLikes = blogs[0]

    for (let i = 0; i < blogs.length; i++) {
        blogMostLikes.likes < blogs[i].likes
            ? blogMostLikes = blogs[i]
            : null
        
    }

    return blogMostLikes
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}