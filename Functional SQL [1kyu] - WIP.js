const ORDER = {
    FROM: 0,
    WHERE: 1,
    GROUPBY: 2,
    HAVING: 3,
    SELECT: 4,
    ORDERBY: 5,
}

function query() {
    const operations = [[], [], [], [], [], [], []];

    let data = [];
    let data_out = [];

    e = (n, cause) => {if (operations[n].length) throw new Error(cause)};

    let exec_mode = false;

    return {
        from: function(from) {
            if (exec_mode) {
                data = data_out = from;

                return;
            }

            e(ORDER.FROM, 'FROM');
            operations[ORDER.FROM].push(from);

            return this;
        },
        where: function(pred) {
            if (exec_mode) { // :(
                if (pred) data_out = data_out.filter(pred);
                
                return;
            }
            operations[ORDER.WHERE].push(pred);
            return this;
        },
        groupBy: function(pred) {
            const grouped = []; //Group every time, even when empty - ?
            if (exec_mode) {
                if (pred) {
                    //gen unique
                    let unique = new Set();
                    data_out.forEach((data_entry, index) => {
                        const pred_value = pred(data_entry);
                        if (!unique.has(pred_value)) {
                            grouped.push([pred_value, []]);
                        }
                        unique.add(pred_value);
                    }); 
                    unique = [...unique];
                    //fetch data
                    
                    unique.forEach((el, index) => {
                        const test = data_out.filter(person => 
                            Object.values(person).includes(el)
                          );

                          grouped[index][1] = test;
                    });
                    
                    data_out = grouped;
                }
                return;
            }

            e(ORDER.GROUPBY, 'GROUPBY');
            operations[ORDER.GROUPBY].push(pred);
            return this;
        },
        having: function() {
            operations[ORDER.HAVING].push('HAVING');
            return this;
        },
        select: function(pred) {
            if (exec_mode) {
                if (pred) {
                    data_out.forEach((data_entry, index) => {
                        for (let prop in data_entry) {
                            if (data_out[index][prop] !== pred(data_entry)) delete data_out[index][prop];
                            if (data_out[index][prop] === pred(data_entry)) data_out[index] = data_out[index][prop]; // :(
                        }
                    }); 
                }
                return;
            }
            e(4, 'SELECT');
            operations[ORDER.SELECT].push(pred);
            return this;
        },
        orderBy: function() {
            e(ORDER.ORDERBY, 'ORDERBY');
            operations[ORDER.ORDERBY].push('ORDERBY');
            return this;
        },
        execute: function() {
            exec_mode = true;
            
            operations.forEach((ind_operations, index) => {
                if (!ind_operations.length) return;
                switch (index) {
                    case ORDER.FROM: {
                        this.from(ind_operations[0]);
                        break;
                    }
                    case ORDER.WHERE: {
                        this.where(ind_operations[0]);
                        break;
                    }
                    case ORDER.GROUPBY: {
                        this.groupBy(ind_operations[0]);
                        break;
                    }
                    case ORDER.HAVING: {
                        break;
                    }
                    case ORDER.SELECT: {
                        this.select(ind_operations[0]);
                        break;
                    }
                    case ORDER.ORDERBY: {
                        break;
                    }
                }
            });

            return data_out;
        },
    }
}