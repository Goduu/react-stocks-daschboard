
import { format } from "date-fns";

/**
 * Format obj by tipe
 * @param {*} obj with dataType and value atributes
 * @returns 
 */
const formatValueByType = (obj) => {
    const type = obj.dataType
    let v = obj.value
    if (v) {
        if (type === 'date') {

            return format(new Date(v*1000), "yyyy-MM-dd");

        } else if (type === 'number') {
            if (v > 1000000000) {
                return (v / 1000000000).toFixed(2) + 'B'
            } else if (v > 1000000) {
                return (v / 1000000).toFixed(2) + 'M'
            }
            return v.toFixed(2)

        } else if (type === 'string') {
            return v
        }
    }
    return null
}

export {formatValueByType}