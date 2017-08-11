exports.getUser = async(ctx, next) => {
    ctx.body = {
        "status1": "home",
        "status2": "app"
    }
}