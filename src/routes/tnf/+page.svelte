<script lang="ts">
    import type { Gender, TrackPoints } from "$lib/types";
    import { APIClient } from "$lib/ApiClient";
    import { OutdoorEvents } from "$lib/const.js";
    import VideoUpload from "../../components/VideoUpload.svelte";
    import VidUpload from "../../components/VidUpload.svelte";

    const apiBaseUrl = import.meta.env.API_BASE_URL;
    let apiclient = new APIClient(apiBaseUrl);
    let loading: boolean = false;

    let category = "Outdoor";
    let gender = "Male";
    let event = "100m";
    let time: number;

    let eventsList: TrackPoints[] = [];

    async function getResults() {
        var result = await apiclient.getResults(category, gender, event, time);
        if (result != undefined) {
            eventsList = [...eventsList, result];
        }
    }

    async function loadDataToDB() {
        loading = true;
        await apiclient.loadDataToDB();
        loading = false;
    }

    let GenderArr = ["Male", "Female"];
    let CategoryArr = ["Indoor", "Outdoor"];
    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
</script>

<section>
    <h2>Iaaf Points Conversion</h2>
    <div>
        <select bind:value={category}>
            {#each CategoryArr as category}
                <option value={category}>
                    {category}
                </option>
            {/each}
        </select>
        <select bind:value={gender}>
            {#each GenderArr as gender}
                <option value={gender}>
                    {gender}
                </option>
            {/each}
        </select>
        <select bind:value={event}>
            {#each OutdoorEvents as event}
                <option value={event.Event}>
                    {event.Event}
                </option>
            {/each}
        </select>
        <input bind:value={time} placeholder="Time" />
        <button on:click={getResults}>Submit</button>
    </div>

    <table class="styled-table">
        <thead>
            <tr>
                <th scope="row">Category</th>
                <th>Event</th>
                <th>Gender</th>
                <th>Mark</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {#if eventsList.length > 0}
                {#each eventsList as row}
                    <tr>
                        <td>{row.Category}</td>
                        <td>{row.Event}</td>
                        <td>{row.Gender}</td>
                        <td>{row.Mark}</td>
                        <td>{row.Points}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>

    <div>
        {#if loading}
            <small>Loading</small>
        {:else}
            <button
                on:click={async () => {
                    await loadDataToDB();
                }}>Load Data</button
            >
        {/if}
    </div>
</section>
<VidUpload/>

<style>
    section {
        display: flex;
        gap: 2rem;
        flex-direction: column;
        background: white;
        padding: 1rem;
    }

    .styled-table {
        border-collapse: collapse;
        font-size: 0.9em;
        min-width: 400px;
    }

    .styled-table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
    }

    .styled-table th,
    .styled-table td {
        padding: 12px 15px;
    }

    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
</style>
