const standardToIndia = standard => {
    const num = standard.split('-')
    return `${num[2]}/${num[1]}/${num[0]}`
}

export default standardToIndia
