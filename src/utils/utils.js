const getRecentItems = (elems) => {
    let recentItems = elems.filter((elem) => {
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var filterationTime = timeStamp - (24 * 3600); //24 hours
        return new Date(elem.updatedAt) >= new Date(filterationTime*1000).getTime();
    })
    localStorage.setItem('recents', recentItems.length);
    return recentItems;
}

const getSortedNotes = (elems) => {
    return elems.sort((a, b) => {
        return new Date(a.updatedAt).getTime() - 
            new Date(b.updatedAt).getTime()
    }).reverse();
}

const getFavourites = (elems) => {
    return elems.filter((elem) => elem.favourite === true);
}

const getSharedNotes = (elems) => {
    return elems.filter((elem) => elem.shared === true);
}

export {
    getRecentItems,
    getSortedNotes,
    getFavourites,
    getSharedNotes
}