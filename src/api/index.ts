import express from 'express';
import { getConnection } from 'typeorm';

import { Article } from '../entity';

const router = express.Router();

router.get('/article', async (req, res) => {
    const data = await getConnection().getRepository(Article).find({
        select: ['id', 'title'],
        order: {
            id: 'DESC',
        },
    });
    res.json(data);
});

router.get('/article/:id', async (req, res) => {
    const data = await getConnection().getRepository(Article).find({
        where: {
            id: req.params.id,
        },
    });
    if (data.length <= 0) {
        return res.status(404).end();
    }
    res.json(data[0]);
});

router.put('/article/add', async (req, res) => {
    const repo = await getConnection().getRepository(Article);
    const article = new Article();
    article.title = req.body.title;
    const result = await repo.save(article);
    res.json(result);
});

export = router;
