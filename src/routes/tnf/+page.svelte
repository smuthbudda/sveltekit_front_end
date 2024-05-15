<script lang="ts">
    import { onMount } from "svelte";
    import {baseAPIUrl} from "../../lib/const"
    let category = "Outdoor";
    let gender = "Male";
    let event = "100m";
    let time: number;

    let jsonData: Event | null = null;
    let eventsList: Event[] = [];

    async function getResults() {
        await fetch(
            `${baseAPIUrl}/api/world-aths/points/${category}/${gender}/${event}?mark=${time}`,
        )
            .then((response) => response.json())
            .then((data) => {
                jsonData = data;
                if (jsonData != null) {
                    eventsList = [...eventsList, jsonData]
                    console.log(eventsList)
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error("Error:", error);
            });
    }

    type Event = {
        Category: string;
        Event: string;
        Gender: string;
        Mark: number;
        Points: number;
    }
</script>

<h2>Iaaf Points Conversion</h2>
<div>
    <input bind:value={category} placeholder="Category" />
    <input bind:value={gender} placeholder="Gender" />
    <input bind:value={event} placeholder="Event" />
    <input bind:value={time} placeholder="Time" />
    <button on:click={getResults}>Submit</button>
</div>

<table>
    <thead>
        <tr>
            <th>Category</th>
            <th>Event</th>
            <th>Gender</th>
            <th>Mark</th>
            <th>Points</th>
        </tr>
    </thead>
    {#if eventsList.length > 0}
        <tbody>
            {#each eventsList as row}
                <tr>
                    <td>{row.points.Category}</td>
                    <td>{row.points.Event}</td>
                    <td>{row.points.Gender}</td>
                    <td>{row.points.Mark}</td>
                    <td>{row.points.Points}</td>
                </tr>
            {/each}
        </tbody>
    {/if}
</table>
