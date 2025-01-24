<script setup lang="ts">
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from 'vaul-vue'
import { AdjustmentsVerticalIcon } from '@heroicons/vue/24/outline'
import type { Filters } from '~/utils/filter'
import type { PropType } from 'vue'

const filters = defineModel({
  type: Object as PropType<Filters>,
  required: true,
})
</script>
<template>
  <div>
    <DrawerRoot>
      <DrawerTrigger as-child>
        <Button small>
          <AdjustmentsVerticalIcon
            class="mr-2 -ml-1 h-5 w-5"
            aria-hidden="true"
          />
          <span>Filter Results</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay class="fixed inset-0 bg-black/10" />
        <DrawerContent
          class="fixed right-0 bottom-0 left-0 flex flex-col rounded-t-lg bg-gray-50 pb-8 shadow-sm dark:bg-gray-800"
        >
          <div
            class="mx-auto mt-4 mb-6 h-1.5 w-12 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"
          />

          <div
            class="mx-auto grid w-full max-w-(--breakpoint-lg) grid-cols-2 gap-4 p-6 pt-4 sm:pt-0 md:grid-cols-4 lg:px-8"
          >
            <Input v-model="filters.name" label="Name:" class="col-span-2" />
            <Input v-model="filters.club" label="Club:" class="col-span-2" />
            <Input
              v-model="filters.minAge"
              label="Min. Age:"
              type="number"
              :form-props="{ max: 120, min: 0, step: 1 }"
            />
            <Input
              v-model="filters.maxAge"
              label="Max. Age:"
              type="number"
              :form-props="{ max: 120, min: 0, step: 1 }"
            />
            <InputSwitch v-model="filters.male" label="Male:" class="mt-2" />
            <InputSwitch
              v-model="filters.female"
              label="Female:"
              class="mt-2"
            />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  </div>
</template>
