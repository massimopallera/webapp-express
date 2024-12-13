import connection from "../database/connection.js";

const index = (req,res) => {

    // Create query string
    const sql = `SELECT * FROM movies`

    // Get all movies
    connection.query(sql, (err, results) => {
        if (err) res.status(err.code).json({'error':err.message})
        if (!results[0]) res.status(404).json({'error' : '404 Not Found'})
        res.status(200).json({'results': results})
    })
}

const show = (req,res) => {

    const sql = `
    SELECT 
        m.*, 
        r.id AS id, 
        r.text AS content, 
        r.vote AS rating, 
        r.created_at AS created_date,
        r.name AS username
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
        if (!results[0]) return res.status(404).json('404 Not Found');

        const result = {
            movie: results[0], // return movie
            reviews: results
                // .filter(row => row.review_id) // Not needed, reviews content in db is set as NOT NULL
                .map(row => ({
                    id: row.id,
                    content: row.content,
                    rating: row.rating,
                    creation_date: row.created_date,
                    username: row.username
                }))
        };

        res.status(200).json({result});
    })
}

// const update
const storeReview = (req,res) => {
    const movie_id = Number(req.params.id)
    const {vote, username, text} = req.body; //there should be rating, username and review

    const query = `INSERT INTO reviews SET vote = ?, text = ?, name = ?, movie_id = ?`

    connection.query(query, [vote, username, text, movie_id],(err, results) => {
        if(err) return res.status(500).json({error: err})
        res.status(204).json({success: true})
        
    })

}
// const destroy 

export default {
    index,
    show,
    storeReview
}