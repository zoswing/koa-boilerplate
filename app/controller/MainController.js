exports.getUser = async(ctx, next) => {
    ctx.response.body = {
        "status1": "home",
        "status2": "app"
    }
}