window.onload = async () => {
  localStorage.getItem("token")
    ? null
    : (window.location.href = "/frontend/login/index.html");
  await fetchUser(localStorage.getItem("token"));
};
