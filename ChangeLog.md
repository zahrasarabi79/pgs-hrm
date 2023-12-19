# Changelog

### AutoComplete Component ###
The `AutoCompleteComponent` is a versatile component that provides a rich autocomplete experience. It allows users to select multiple options from a list and integrates seamlessly with forms.
- **Feature:** Added a new `AutoCompleteComponent` component.
- **Enhancement:** Integrated `react-hook-form` for form control.
- **Enhancement:** Provided prop types for better documentation (`AutoCompleteComponentProps` and `OptionType`).
- **Enhancement:** Improved handling of input value changes (`onInputChange` callback).
- **Enhancement:** Added support for multiple disabled indices.
- **label (string):** The label for the autocomplete input.
- **variant (string):** The style variant for the input (`'outlined'`, `'standard'`, or `'filled'`).
- **disabled (boolean):** If true, the autocomplete is disabled.
- **readOnly (boolean):** If true, the autocomplete is in read-only mode.
- **disabledIndices (number[]):** An array of indices that specifies disabled options.
- **dataList (any[]):** An array of data used to populate the autocomplete options.
- **noOptionsText (string):** Text displayed when no options are available.
- **optionName (string):** The key in the data list objects used as the label for options.
- **name (string):** The name for the form control.
- **errors (boolean):** Boolean indicating whether there is an error.
- **errorMessage (string):** The error message to display when there is an error.
- **setValue (function):** A function to set the value in the form.
- **multiple (boolean):** If true, allows the selection of multiple options.
- **control (object):** The `react-hook-form` control object.
- **watch (function):** The `react-hook-form` watch function.
#### Changed

- **Refactor:** Refactored the component to use the `Controller` from `react-hook-form`.
- **Refactor:** Simplified the rendering logic within the `Controller`.
- **Refactor:** Reorganized and cleaned up the component code.

### Select Component ###
- **Feature:** Added a new `SelectComponent` component for enhanced selection controls.

  The `SelectComponent` provides a versatile selection interface with the following features:

  ###### Props:

    - **disabled (boolean):** If true, the selection component is disabled.
    - **label (string):** The label for the selection input.
    - **size (string):** The size of the selection component.
    - **multiple (boolean):** If true, allows the selection of multiple options.
    - **items (string[]):** An array of items used to populate the selection options.
    - **control (object):** The `react-hook-form` control object.
    - **errors (boolean):** Boolean indicating whether there is an error.
    - **name (string):** The name for the form control.
    - **setValue (function):** A function to set the value in the form.

  ###### Functionality:

    - Supports both single and multiple selections.
    - Dynamically adjusts its height based on the number of options.
    - Displays a loading spinner when the list of items is empty.
    - Provides customizable error messaging.

  ###### UI Components:

    - Utilizes MUI components such as `FormControl`, `InputLabel`, `Select`, `OutlinedInput`, `MenuItem`, `Chip`, `Typography`, `FormHelperText`, and `CircularProgress` for a consistent and visually appealing design.

### loading Component

- **Feature:** Added a `LoadingPage` component for displaying centered loading indicators with customizable height.

### Added NotFound Component

- **Feature:** Added `NotFoundBox` component for displaying a centered message and image when content is not found.

### Added Hierarchy list

- **Feature:** Introduced `HierarchyList` page for managing hierarchical data.
- **Feature:** Included a `MainCard` component to structure the hierarchy list layout.
- **Feature:** Added a "Create" button to navigate to the hierarchy creation page.
- **Feature:** Implemented `HierarchyListContent` component for displaying a paginated list of hierarchies.
- **Feature:** Incorporated loading indicators during data fetching for a better user experience.
- **Feature:** Introduced a "Not Found" message when no hierarchies are present on the current page.
- **Feature:** Utilized the `Table` component to organize hierarchy data with customizable headers.
- **Feature:** Implemented `HierarchiesTableBody` component to display individual hierarchy items in a table.
- **Feature:** Included table cells for hierarchy ID, name, and rank with customizable widths.
- **Feature:** Integrated MUI components such as `TableRow`, `TableCell`, `Tooltip`, and `IconButton` for consistent styling.
- **Feature:** Added icons for "View," "Edit," and "Delete" actions with corresponding tooltips.
- **Feature:** Provided flexibility for further functionality by handling click events with placeholders.
