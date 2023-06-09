<script setup>
    import config from "../../config";
    let colors = [
        ['pink', 'red'],
        ['green', 'teal'],
        ['tan', 'plum'],
        ['green', 'tan'],
        ['plum', 'red'],
        ['plum', 'teal'],
    ];
    const randomHex = () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, "0");

    /** Uses `randomHex` to generate a random color string */
    const randomColor = () => `#${[...Array(3)].map(randomHex).join("")}`;

    /** Returns a random value between 0 and 360 */
    const randomAngle = () => `${Math.floor(Math.random() * 361)}deg`;
    const randomGradient = () => [randomAngle(), randomColor(), randomColor()];
    const [angle, color1, color2] = randomGradient();
    const colorIndex = colors[Math.floor(Math.random() * colors.length)];
    const bgGradien = {'border-radius': '5px', 'backgroundImage': 'linear-gradient('+angle+', '+color1+', '+color2+')'};
</script>
<script>
    export default {
        props: ['image']
    }
</script>
<template>
    <div class="card card-bordered">
        <div class="card-inner">
            <h6 class="card-title">
                <div class="d-flex">
                    <router-link :to="`/store/${Number(image.image_id)}-${image.code}`" class="text-ellipsis" :title="`${image.name}`">{{image.name}}</router-link>
                    <div class="ms-auto"><span class="badge bg-outline-primary" >{{config.CANISTER_IMAGE_CATEGORY[image.category]}}</span></div>
                </div>

            </h6>

            <div class="d-flex flex-row">
                <div class="w-30 h-40 bg-light image-code" :style="bgGradien">
                    <router-link :to="`/store/${Number(image.image_id)}-${image.code}`">
                        <p>{{image.code}}</p>
                    </router-link></div>
                <div class="p-2 w-70">
                    <div class="sub-text text-ellipsis h-40">{{image.brief}}</div>
                    <div class="rating-wrap my-1">
                        <ul class="rating">
                            <li><em class="icon ni ni-star-fill"></em></li>
                            <li><em class="icon ni ni-star-fill"></em></li>
                            <li><em class="icon ni ni-star-fill"></em></li>
                            <li><em class="icon ni ni-star-half-fill"></em></li>
                            <li><em class="icon ni ni-star"></em></li>
                        </ul>
                        <span class="amount ms-2">{{image.rating}} (0)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scope>
    .image-code{
        position: relative;
    }
    .image-code p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        color: #ffffff;
        text-transform: uppercase;
        text-align: center;
    }
</style>