async function deletePost(id) {
  const res = await fetch("/delete-post", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (data.success) {
    window.location.href = "/";
  }
}
function editPost() {
  const post = document.querySelector(".post");
  const length = post.value.length;

  post.focus();
  post.setSelectionRange(length, length);
}
