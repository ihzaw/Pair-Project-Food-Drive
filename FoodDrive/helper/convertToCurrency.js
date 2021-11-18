function currency(value) {
    return new Intl.NumberFormat('in-ID', { style: 'currency', currency:'IDR'}).format(value)
}

module.exports = currency