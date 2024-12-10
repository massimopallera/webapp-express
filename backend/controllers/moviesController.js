import connection from "../database/connection.js";

const index = (req,res) => {

    const sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {
        if (err) res.status(err.code).send(err.message)
        if (!results[0]) res.status(404).send('404 Not Found')
        res.status(200).json({'results': results})
    })
}



const show = (req,res) => {

    const sql = `SELECT r.*
    FROM reviews AS r
    INNER JOIN movies AS m ON m.id = r.movie_id
    WHERE m.id = ?`

    let element

    const getElement = `SELECT * FROM movies WHERE id = ?`

    connection.query(getElement, [req.params.id], (err,results) => {
        element = results
    })

    connection.query(sql, [req.params.id] ,(err, results) => {
        if (err) res.status(err.code).send(err.message)
        if (!results[0]) res.status(404).send('404 Not Found')
        res.status(200).json({
            'results': results, 
            'movie':element
        })        
    })
    
}



export default {
    index,
    show
}