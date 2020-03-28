// const express = require('express');
const {Router} = require('express');

const {celebrate, Segments, Joi} = require('celebrate');

const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileOngsController = require('./controllers/ProfileOngsController');
const SessioonController = require('./controllers/SessionController');

// const routes = express.Router();
// eslint-disable-next-line new-cap
const routes = Router();

routes.post(
    '/sessions',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    SessioonController.create,
);

routes.get(
    '/ongs',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        pagina_atual: Joi.number(),
        registros_por_pagina: Joi.number(),
      }),
    }),
    OngsController.index,
);

routes.post(
    '/ongs',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required().required(),
        uf: Joi.string().required().required().length(2),
      }),
    }),
    OngsController.create,
);

routes.get(
    '/profile',
    celebrate({
      [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().required(),
      }).unknown(),
      [Segments.QUERY]: Joi.object().keys({
        pagina_atual: Joi.number(),
        registros_por_pagina: Joi.number(),
      }),
    }),
    ProfileOngsController.index,
);

routes.get(
    '/incidents',
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        pagina_atual: Joi.number(),
        registros_por_pagina: Joi.number(),
      }),
    }),
    IncidentsController.index,
);

routes.post(
    '/incidents',
    celebrate({
      [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().required(),
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
      }),
    }),
    IncidentsController.create,
);

routes.delete(
    '/incidents/:id',
    celebrate({
      [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().required(),
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }),
    IncidentsController.delete,
);

module.exports = routes;
