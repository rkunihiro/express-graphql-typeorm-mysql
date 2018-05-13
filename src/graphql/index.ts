import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { getConnection } from 'typeorm';
import { Article } from '../entity';

const schema = buildSchema(`
    type Article {
        id: ID
        title: String
    }

    type Query {
        getArticle(id: Int): Article
        getArticleList: [Article]
    }

    type Mutation {
        addArticle(title: String): Article
    }

`);

const root = {
    getArticleList: async () => {
        const data = await getConnection().getRepository(Article).find({
            select: ['id', 'title'],
            order: {
                id: 'DESC',
            },
        });
        return data;
    },

    getArticle: async ({ id }) => {
        const data = await getConnection().getRepository(Article).find({
            select: ['id', 'title'],
            where: { id },
        });
        return data[0];
    },

    addArticle: async ({ title }) => {
        const repo = await getConnection().getRepository(Article);
        const article = new Article();
        article.title = title;
        return await repo.save(article);
    },
};

export = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
});
