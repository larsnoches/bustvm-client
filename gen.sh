#!/bin/bash
ng g s /modules/bustrips/services/bustrips-store/bustrips-store

ng g c modules/buses/components/buses-list/buses-list
ng g interface modules/buses/models/buses-list --type=model

ng g c modules/buses/components/buses-item/buses-item
ng g interface modules/buses/models/buses-item --type=model

ng g s modules/buses/services/buses/buses-store


ng g c modules/buspoint-types/components/buspoint-types-list/buspoint-types-list
ng g interface modules/buspoint-types/models/buspoint-types-list --type=model

ng g c modules/buspoint-types/components/buspoint-types-item/buspoint-types-item
ng g interface modules/buspoint-types/models/buspoint-types-item --type=model

ng g s modules/buspoint-types/services/buspoint-types/buspoint-types-store


ng g c modules/buspoints/components/buspoints-list/buspoints-list
ng g interface modules/buspoints/models/buspoints-list --type=model

ng g c modules/buspoints/components/buspoints-item/buspoints-item
ng g interface modules/buspoints/models/buspoints-item --type=model

ng g s modules/buspoints/services/buspoints/buspoints-store


ng g c modules/carriers/components/carriers-list/carriers-list
ng g interface modules/carriers/models/carriers-list --type=model

ng g c modules/carriers/components/carriers-item/carriers-item
ng g interface modules/carriers/models/carriers-item --type=model

ng g s modules/carriers/services/carriers/carriers-store


ng g c modules/fares/components/fares-list/fares-list
ng g interface modules/fares/models/fares-list --type=model

ng g c modules/fares/components/fares-item/fares-item
ng g interface modules/fares/models/fares-item --type=model

ng g s modules/fares/services/fares/fares-store


ng g c modules/seat-states/components/seat-states-list/seat-states-list
ng g interface modules/seat-states/models/seat-states-list --type=model

ng g c modules/seat-states/components/seat-states-item/seat-states-item
ng g interface modules/seat-states/models/seat-states-item --type=model

ng g s modules/seat-states/services/seat-states/seat-states-store


ng g c modules/seats/components/seats-list/seats-list
ng g interface modules/seats/models/seats-list --type=model

ng g c modules/seats/components/seats-item/seats-item
ng g interface modules/seats/models/seats-item --type=model

ng g s modules/seats/services/seats/seats-store


ng g c modules/tickets/components/tickets-list/tickets-list
ng g interface modules/tickets/models/tickets-list --type=model

ng g c modules/tickets/components/tickets-item/tickets-item
ng g interface modules/tickets/models/tickets-item --type=model

ng g s modules/tickets/services/tickets/tickets-store


