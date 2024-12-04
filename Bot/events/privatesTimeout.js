const Database = require("st.db");
const db1 = new Database("./Database/privatesRooms.json");

module.exports = (client) => {
  const datas = db1.get({ key: `ROOMS` }) || [];
  datas.forEach((data) => {
    const channel = client.channels.cache.get(`${data.channelId}`);

    const timeout = data.endTimestamp - Date.now();
    let array = db1.get({ key: `ROOMS` }) || [];
    let v = array.find((g) => g.channelId == data.channelId);

    if (timeout <= 0) return db1.unpush({ key: "ROOMS", value: v });

    setTimeout(() => {
      let user = client.users.cache.get(`${data.ownerId}`);
      if (!client.channels.cache.get(data.channelId))
        return db1.unpush({ key: "ROOMS", value: v });
      client.channels.cache.get(data.channelId).delete();
      if (!user) return;
      user
        .send(
          user.toString() +
            "" +
            "**لقد انتهت مدة رومك الخاصه للتجديد يرجي التوجه الي <#906172547937210469> **"
        )
        .catch(() => {});
      db1.unpush({ key: "ROOMS", value: v });
    }, timeout);
  });
};
