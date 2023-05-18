<script lang="ts">
  import { onMount } from 'svelte'
  import { Page } from './types/misc'
  import Reminder from './pages/Reminder.svelte'
  import Coordinates from './pages/Coordinates.svelte'
  import Random from './pages/Random.svelte'
  import Stuff from './pages/Todos.svelte'
  import { StatusBar, Style } from '@capacitor/status-bar'
  import Todos from './pages/Todos.svelte'

  let currentPage: Page = Page.Reminder
  let currentPageId: number = 0
  $: pageTranslate = `--scrolloffset: -${currentPageId * 100}vw`

  onMount(async () => {})

  function setPage(page: Page) {
    if (currentPage == page) return
    currentPage = page
    if (currentPage == Page.Reminder) currentPageId = 0
    if (currentPage == Page.Coordinates) currentPageId = 1
    if (currentPage == Page.Random) currentPageId = 2
    if (currentPage == Page.Todos) currentPageId = 3
    updateStatusBar()
  }

  async function updateStatusBar() {
    try {
      if (currentPage == Page.Coordinates) {
        await StatusBar.setOverlaysWebView({ overlay: true })
        await StatusBar.setStyle({ style: Style.Light })
      } else {
        await StatusBar.setOverlaysWebView({ overlay: false })
        await StatusBar.setStyle({ style: Style.Dark })
      }
    } catch (error) {
      console.warn('Cannot update status bar')
    }
  }
</script>

{#if currentPage != Page.Coordinates}
  <header>
    <span class="title">{currentPage}</span>
  </header>
{/if}

<main>
  <div class="scrollContainer" style={pageTranslate}>
    <div><Reminder /></div>
    <div><Coordinates /></div>
    <div><Random /></div>
    <div><Todos /></div>
  </div>
</main>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<footer>
  <div class={currentPage == Page.Reminder ? 'active' : ''} on:click={setPage.bind(this, Page.Reminder)}>
    <span class="material-icons md-30">edit_notifications</span>
    <span class="text">{Page.Reminder}</span>
  </div>
  <div class={currentPage == Page.Coordinates ? 'active' : ''} on:click={setPage.bind(this, Page.Coordinates)}>
    <span class="material-icons md-30">explore</span>
    <span class="text">{Page.Coordinates}</span>
  </div>
  <div class={currentPage == Page.Random ? 'active' : ''} on:click={setPage.bind(this, Page.Random)}>
    <span class="material-icons md-30">casino</span>
    <span class="text">{Page.Random}</span>
  </div>
  <div class={currentPage == Page.Todos ? 'active' : ''} on:click={setPage.bind(this, Page.Todos)}>
    <span class="material-icons md-30">inventory_2</span>
    <span class="text">{Page.Todos}</span>
  </div>
</footer>

<style>
  header {
    grid-row: 1;
    height: 50px;
    background: var(--bg-1);
    color: var(--txt-0);
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }
  header > .title {
    font-size: 24px;
  }
  main {
    grid-row: 2;
    width: 100vw;
    overflow: hidden;
    background: var(--bg-0);
    display: flex;
  }
  main > .scrollContainer {
    display: flex;
    flex-direction: row;
    transition: transform 0ms ease-in-out;
    transform: translateX(var(--scrolloffset));
  }
  main > .scrollContainer > div {
    min-width: 100vw;
    color: var(--txt-1);
    padding-bottom: 60px;
    overflow: auto;
    position: relative;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: hsla(0 0% 9% / 0.95);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 2px solid var(--bg-2);
  }
  footer > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--txt-1);
    font-size: 14px;
    width: 70px;
  }
  footer > div.active {
    color: #29b8b6;
  }
</style>
