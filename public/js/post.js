const saveBtn = document.querySelector(".btn-save");
const post = document.querySelector(".post");

async function handleDeleteClick(id) {
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

function handleEditClick() {
  const length = post.value.length;
  post.focus();
  post.setSelectionRange(length, length);
  saveBtn.classList.toggle("show");
}

function handleSaveClick() {
  saveBtn.classList.remove("show");
}
