
async function get_entries_yearly(country) {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_entries_yearly&country=${country}`, {
            method: "GET",
        })
    ).json();
}

async function get_exits_yearly(country) {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_exits_yearly&country=${country}`, {
            method: "GET",
        })
    ).json();
}

async function get_countries() {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_countries`, {
            method: "GET",
        })
    ).json();
}

async function get_entries(country) {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_entries&country=${country}`, {
            method: "GET",
        })
    ).json();
}

async function get_exits(country) {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_exits&country=${country}`, {
            method: "GET",
        })
    ).json();
}

async function get_total_balances() {
    return await (
        await fetch(`backend/controller/Controller.php/?mode=get_total_balances`, {
            method: "GET",
        })
    ).json();
}