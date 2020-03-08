<script>
  import Column from "./Column.svelte";
  import { columns } from "./data.js";
</script>

<style>
  main {
    display: flex;
    padding: 25px;
    margin: 0 auto;
    justify-content: space-between;
    overflow: auto;
  }
</style>

<main>
  {#each $columns as column}
    <Column {column} />
  {/each}
</main>
