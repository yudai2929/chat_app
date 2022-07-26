import BukkenPropertyCard, {
  Props,
} from '../components/BukkenPropertyCard.vue';
import { Story, Meta } from '@storybook/vue3';
import buildingPropertyPreviewDummy from '@/stories/dummyData/buildingPropertyPreviewDummy';

export default {
  title: 'BukkenPropertyCard',
  component: BukkenPropertyCard,
} as Meta;

const Template: Story<Props> = (args) => ({
  components: { BukkenPropertyCard },
  setup() {
    return { args };
  },
  template: '<BukkenPropertyCard v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  buildingPropertyPreview: buildingPropertyPreviewDummy,
};
