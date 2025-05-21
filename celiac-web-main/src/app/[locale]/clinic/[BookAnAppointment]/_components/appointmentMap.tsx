"use client"
import React, { useRef, useEffect } from 'react';
import L, { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../../../../../public/map marker.png';

const AppointmentMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const latitude = 24.7136;
        const longitude = 46.6753;
        const placeCoordinates: LatLngExpression = [latitude, longitude];

        const map = L.map(mapRef.current!).setView(placeCoordinates, 5);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const customIcon = new Icon({
            iconUrl: markerIcon.src,
            iconSize: [32, 32]
        });


        L.marker(placeCoordinates, { icon: customIcon }).addTo(map);


        return () => {
            map.remove();
        };
    }, []);

    return <div
        ref={mapRef}
        className=" z-[1] md:w-full lg:w-full sm:w-full w-full rounded-2xl h-[100%]   "

    />;

};

export default AppointmentMap;
