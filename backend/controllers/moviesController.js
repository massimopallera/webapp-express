import connection from "../database/connection.js";

const index = (req,res) => {

    // Create query string
    const sql = `SELECT * FROM movies`

    // Get all movies
    connection.query(sql, (err, results) => {
        if (err) res.status(err.code).send(err.message)
        if (!results[0]) res.status(404).send('404 Not Found')
        res.status(200).json({'results': results})
    })
}

/* const show = (req,res) => {

    //Create query string
    const sql = `SELECT r.*
    FROM reviews AS r
    INNER JOIN movies AS m ON m.id = r.movie_id
    WHERE m.id = ?`
    
    let element
    const getElement = `SELECT * FROM movies WHERE id = ?`

    // Get single movie
    connection.query(getElement, [req.params.id], (err,results) => {
        element = results
    })

    // Get reviews
    connection.query(sql, [req.params.id] ,(err, results) => {
        if (err) res.status(err.code).send(err.message)
        if (!results[0]) res.status(404).send('404 Not Found')
        res.status(200).json({
            'results': results, 
            'movie':element
        })        
    })
} */

const show = (req,res) => {

    // gpt
   /*  const sql = `
    SELECT 
        m.*, 
        r.id AS review_id, 
        r.text AS review_content, 
        r.vote AS review_rating, 
        r.created_at AS review_created_at
    FROM 
        movies AS m
    LEFT JOIN 
        reviews AS r 
    ON 
        m.id = r.movie_id
    WHERE 
        m.id = ?
    `; */

    const sql = `
    SELECT 
        m.*, 
        r.id AS id, 
        r.text AS content, 
        r.vote AS rating, 
        r.created_at AS created_date
    FROM 
        movies AS m
    LEFT JOIN 
        reviews AS r 
    ON 
        m.id = r.movie_id
    WHERE 
        m.id = ?
    `;


    connection.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(err).send(err.message);

        if (!results.length) return res.status(404).send('404 Not Found');

        //gpt 
        // Raggruppa le recensioni
        /* const movie = {
            ...results[0], //film
            reviews: results
                .filter(row => row.review_id) // Esclude le righe senza recensioni
                .map(row => ({
                    id: row.review_id,
                    content: row.review_content,
                    rating: row.review_rating,
                    created_at: row.review_created_at
                }))
        }; */


        const result = {
            movie: results[0], // return movie
            reviews: results
                // .filter(row => row.review_id) // Not needed, reviews content in db is set as NOT NULL
                .map(row => ({
                    id: row.id,
                    content: row.content,
                    rating: row.rating,
                    created_at: row.created_date
                }))
        };

        res.status(200).json({result});
    })
}


// const update

// const destroy 

export default {
    index,
    show
}