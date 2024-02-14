import { uniqBy } from "lodash";

/**
	 * 
	 * 
	 * We have tow arrays, one is ["Size", "color"] and other is
	 * 
[
    [
        "XL",
        "RED"
    ],
    [
        "XL",
        "BLUE"
    ],
    [
        "L",
        "RED"
    ],
    [
        "L",
        "BLUE"
    ],
    [
        "M",
        "RED"
    ],
    [
        "M",
        "BLUE"
    ],
    [
        "S",
        "RED"
    ],
    [
        "S",
        "BLUE"
    ]
]

	we want to merge both arrays to get the following result
	[
		{
			name: "Size",
			field:[
				{value: "XL"},
				{value: "L"},
				{value: "M"},
			]
		}
	]
		 */

export default function convertStringArrayToObjectArray(array = []) {
  const mergeTwoArrays = (arr1 = [], arr2 = []) => {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push({
        name: arr1[i],
        fields: uniqBy(
          Array.isArray(arr2) &&
            arr2.length > 0 &&
            arr2.map((item) => {
              return { id: 0, value: item && item[i] };
            }),
          "value"
        ),
      });
    }
    return result;
  };
  const getOptionName =
    Array.isArray(array) &&
    array.map((item) => {
      return item.option_name;
    });
  const getOptionValue =
    Array.isArray(array) &&
    array.map((item) => {
      return item.option_value;
    });
  const getUniqueOptionName = Array.isArray(getOptionName) && [
    ...new Set(getOptionName.flat()),
  ];
  const mergedOptions =
    Array.isArray(getUniqueOptionName) &&
    Array.isArray(getOptionValue) &&
    mergeTwoArrays(getUniqueOptionName, getOptionValue);

  return mergedOptions;
}
