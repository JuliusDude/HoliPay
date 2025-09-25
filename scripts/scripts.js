// Demo data for destinations based on interest
const destinationData = {
    beach: ["Maldives", "Goa", "Bali"],
    mountains: ["Swiss Alps", "Himalayas", "Rocky Mountains"],
    city: ["New York", "Paris", "Tokyo"]
};

// Picture slides for each interest (uses picsum placeholders; replace with your own images if desired)
const destinationImages = {
    beach: [
        { src: "https://www.kuoni.co.uk/upload/james/mil.jpg", alt: "Maldives beach", caption: "Maldives" },
        { src: "https://voiceofadventure.com/wp-content/uploads/2022/06/60d0813807aff-Baga_Beach_In_Goa.jpg", alt: "Goa beach", caption: "Goa" },
        { src: "https://media.cntravellerme.com/photos/64e73087238bdd124237b565/16:9/w_2580,c_limit/GettyImages-1145042281.jpeg", alt: "Bali beach", caption: "Bali" }
    ],
    mountains: [
        { src: "https://wallpaperaccess.com/full/5434876.jpg", alt: "Swiss Alps", caption: "Swiss Alps" },
        { src: "https://images7.alphacoders.com/454/454350.jpg", alt: "Himalayas", caption: "Himalayas" },
        { src: "https://i.redd.it/mc4esopszxuy.jpg", alt: "Rocky Mountains", caption: "Rocky Mountains" }
    ],
    city: [
        { src: "https://www.goodfreephotos.com/albums/united-states/new-york/new-york-city/new-york-cityscape-with-lighted-up-skyscrapers.jpg", alt: "New York City", caption: "New York" },
        { src: "https://wallpaperaccess.com/full/1192224.jpg", alt: "Paris City", caption: "Paris" },
        { src: "https://jw-webmagazine.com/wp-content/uploads/2019/06/jw-5d14997e0fdb82.16770798.jpeg", alt: "Tokyo City", caption: "Tokyo" }
    ]
};

let itinerary = [];
let budget = {
    flight: 0,
    hotel: 0,
    activity: 0
};

$(document).ready(function(){

    // Destination Search
    $("#destinationForm").submit(function(e){
        e.preventDefault();
        const interest = $("#interest").val();
        const destinations = destinationData[interest] || [];

        // Render text results
        let html = "<ul class='list-group'>";
        destinations.forEach(dest => {
            html += `<li class="list-group-item">${dest}</li>`;
        });
        html += "</ul>";
        $("#destinationResults").html(html);

        // Render slides for selected interest
        renderDestinationCarousel(interest);
    });

    // Accommodation and Transport
    $("#accommodationTransportForm").submit(function(e){
        e.preventDefault();
        const hotel = $("#hotel").val();
        const transport = $("#transport").val();
        itinerary.push({
            type: "Accommodation & Transport",
            details: `Hotel: ${hotel || "N/A"}, Transport: ${transport}`,
            date: "",
            time: ""
        });
        updateItinerary();
    });

    // Activity Planner
    $("#activityForm").submit(function(e){
        e.preventDefault();
        const activity = $("#activity").val();
        const date = $("#activityDate").val();
        const time = $("#activityTime").val();
        itinerary.push({
            type: "Activity",
            details: activity,
            date,
            time
        });
        updateItinerary();
    });

    // Trip Itinerary
    function updateItinerary() {
        let html = "<ul class='list-group'>";
        itinerary.forEach(item => {
            html += `<li class='list-group-item'>
                <strong>${item.type}:</strong> ${item.details}
                ${item.date ? `<span> | Date: ${item.date}</span>` : ""}
                ${item.time ? `<span> | Time: ${item.time}</span>` : ""}
            </li>`;
        });
        html += "</ul>";
        $("#itinerary").html(html);
    }

    // Budget Tracker
    $("#budgetForm").submit(function(e){
        e.preventDefault();
        budget.flight = Number($("#flightCost").val());
        budget.hotel = Number($("#hotelCost").val());
        budget.activity = Number($("#activityCost").val());
        updateBudgetSummary();
    });

    function updateBudgetSummary() {
        const total = budget.flight + budget.hotel + budget.activity;
        $("#budgetSummary").html(`
            <strong>Estimated Total Cost:</strong> $${total}<br>
            Flight: $${budget.flight} | Hotel: $${budget.hotel} | Activities: $${budget.activity}
        `);
    }

    // Render Bootstrap carousel for destinations
    function renderDestinationCarousel(interest) {
        const images = destinationImages[interest] || [];
        if (!images.length) {
            $("#destinationCarouselWrapper").empty();
            return;
        }

        const carouselId = "destinationCarousel";
        const indicators = images.map((_, idx) => `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${idx}" ${idx === 0 ? 'class="active" aria-current="true"' : ""} aria-label="Slide ${idx + 1}"></button>
        `).join("");

        const slides = images.map((img, idx) => `
            <div class="carousel-item ${idx === 0 ? "active" : ""}">
                <img src="${img.src}" class="d-block w-100" alt="${img.alt}" loading="lazy">
                <div class="carousel-caption d-none d-md-block">
                    <h5 class="mb-0">${img.caption}</h5>
                </div>
            </div>
        `).join("");

        const carouselHtml = `
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

        $("#destinationCarouselWrapper").html(carouselHtml);
    }

});