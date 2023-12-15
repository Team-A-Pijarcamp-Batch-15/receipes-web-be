const {
  recipe_bookmarks,
  recipe_likes,
  recipe_statistics
} = require('../Sequelize/models')

class RecipePrivateController {
  static async _bookmarkRecipe(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const addBookmark = await recipe_bookmarks.findOrCreate({
        where: { recipes_uid, user_uid },
        defaults: { recipes_uid, user_uid }
      })

      await recipe_statistics.findOrCreate({
        where: { recipes_uid },
        defaults: { recipes_uid }
      })

      await recipe_statistics.increment('bookmarked', {
        where: { recipes_uid }
      })

      // console.log(addBookmark)
      res.status(200).json({
        status: 200,
        message: 'bookmarked'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }

  static async _bookmarkDelete(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const deleteBookmark = await recipe_bookmarks.destroy({
        where: { recipes_uid, user_uid }
      })

      console.log(deleteBookmark)
      res.status(200).json({
        status: 200,
        message: 'bookmark deleted'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }

  static async _likeRecipe(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const addLike = await recipe_likes.findOrCreate({
        where: { recipes_uid, user_uid },
        defaults: { recipes_uid, user_uid }
      })

      await recipe_statistics.findOrCreate({
        where: { recipes_uid },
        defaults: { recipes_uid }
      })

      await recipe_statistics.increment('likes', {
        where: { recipes_uid }
      })

      // console.log(addBookmark)
      res.status(200).json({
        status: 200,
        message: 'liked'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }
}

module.exports = RecipePrivateController
