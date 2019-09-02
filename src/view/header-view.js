

export const header = () => {
  const headerDiv = document.createElement('div');
  const headerContent = `
  <header>
  <h2>Wakanda Café</h2>
  <nav class="nav-links flex menu-bar">
    <a id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
      <li><a id="user-name"><span class="icon-user">User</a></li>
      <div class="only-flex">
        <img id="photo" class="photo-header">
        <a id="user-name"></a>
      </div>
      <li><a id="home-pag"><span class="icon-home2"></span>Home</a></li>
      <li><a id="setting"><span class="icon-info"></span>Setting</a></li>
      <li><a id="sign-out"><span class="icon-exit"></span>Log Out</a></li>
    </ul>
  </nav>
</header>
  `;
  headerDiv.innerHTML = headerContent;
  return headerDiv;
};
