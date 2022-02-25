const toStandardDateString = indianString => {
    const comp = indianString.split('/')
    if (comp[1].length === 1) comp[1] = '0' + comp[1]
    if (comp[0].length === 1) comp[0] = '0' + comp[0]

    return `${comp[2]}-${comp[1]}-${comp[0]}`
}
export default toStandardDateString
