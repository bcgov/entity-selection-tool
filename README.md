# Buisness Stuctures Tool
This tool helps you decide among the most common types: proprietorships, partnerships, corporations, benefit companies, co-operatives, and non-profit societies.



## To install 
```
npm install @bizpal/open-services-bst
```

## Importing in Vue
```
import bst from "@bizpal/open-services-bst";
export default {
  name: "App",
  components: {
    ...bst
  }
};

```

## Usage
```
 <business-structures-tool />

```

## Customization
```
 <business-structures-tool >
      <template #start="{homeModal}">
        <a @click="homeModal()">start</a>
      </template>
</business-structures-tool>
```
