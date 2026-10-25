import express from 'express';
import morgan from 'morgan';
import { existsSync } from 'fs';

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/static', express.static('static'));

app.set('view engine', 'ejs');
app.set('views', './templates');

function capitalize(str) {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

app.use(async (req, res, next) => {
    const page = req.path.replace('/', '') || 'home';

    // Check if requested content exists.
    if (!existsSync(`templates/${page}.ejs`))
        return res.status(404).render('base', { title: 'Drew Fitzgerald - 404 Not Found', content: '404' });

    res.render('base', { title: `Drew Fitzgerald - ${capitalize(page)}`, content: page });
});

app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);

        process.exit(1);
    }

    console.log(`Server running on http://localhost:${PORT}`);
});