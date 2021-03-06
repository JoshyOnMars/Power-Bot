const yts = require('yt-search');

module.exports = {
    name: 'youtube',
    description: "Search on YouTube",
    async execute(message, args, client) {
        if (!args.length) return message.reply('No search query given') //Checks if the user gave any search queries
        const searched = await yts.search(args.join(' ')); //Searches for videos
        message.reply(!searched.videos.length ? 'No Results' : searched.videos[0].url); //Sends the result
    }
}
