import store from "../src/index.js";
import { fetchRequest, IP } from "../src/api/fetch.js";
import {
  CommentError,
  CommentRequest,
  CommentSuccess,
} from "../flux/actions/comment.js";

/**
 * Выполняет запрос на получение данных конкретного фильма по его UUID.
 * @param {string} uuid UUID фильма.
 * @throws {Error} Если полученные данные не являются объектом или произошла ошибка при выполнении запроса.
 */
export async function getCommentData(uuid) {
  try {
    store.dispatch(CommentRequest());
    // const response = await fetchRequest(`${IP}/${uuid}/comments`, "GET");
    const data = {
      status: 200,
      comments: [
        {
          uuid: "ddfa2394-8fe5-4ab6-85a9-42aefafe193f",
          filmUuid: "302fc810-7529-4f0b-ad68-ae0bf6c99165",
          authorUuid: "9108b8d9-417b-4a16-82b4-dc5b24a8eda3",
          author: "borber1234",
          text: "sdfasdf\n",
          score: 4,
          added_at: "2024-05-27T02:13:56.156275Z",
        },
        {
          uuid: "",
          filmUuid: "",
          authorUuid: "",
          author: "",
          text: "",
          score: 0,
          added_at: "0001-01-01T00:00:00Z",
        },
      ],
    };
    // const data = await response.json();

    if (!data.comments || !Array.isArray(data.comments)) {
      throw new Error("Ошибка: полученные данные не являются массивом");
    }

    store.dispatch(CommentSuccess(data.comments));
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
    store.dispatch(CommentError());
  }
}
