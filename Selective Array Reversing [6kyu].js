function selReverse(array, length) {
    if (!length) return array;
    
    let iterator = 0;
    const out = [];
    while (iterator < array.length) {
      out.push(...array.slice(iterator, iterator + length).reverse());
      iterator += length;
    }
    return out;
  }