import { initBotId } from "botid/client/core"

initBotId({
  protect: [
    {
      path: "/forms/contact-form",
      method: "POST",
    },
    {
      path: "/forms/counseling-request-form",
      method: "POST",
    },
  ],
})
