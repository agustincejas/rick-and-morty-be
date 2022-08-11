/**
 * @openapi
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        status:
 *          type: string
 *        gender:
 *          type: string
 *        origin:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            url:
 *              type: string
 *        location:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            url:
 *              type: string
 *        image:
 *          type: string
 *        episode:
 *          type: array
 *          items:
 *            type: string
 *        url:
 *          type: string
 *        created:
 *          type: string
 *    Characters:
 *      type: object
 *      properties:
 *        info:
 *          type: object
 *          properties:
 *            count:
 *              type: number
 *            pages:
 *              type: number
 *            next:
 *              type: string
 *            prev:
 *              type: string
 *        results:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Character'
 */