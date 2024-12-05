import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { updateCharacter } from 'features/Characters/characters.slice';
import { InputGroup } from 'common/components/InputGroup/InputGroup';
import { Form } from 'common/components/Form/Form';
import { GenderFilterType, SpeciesFilterType, StatusFilterType } from 'features/Characters/characters.types';
import { genderOptions, speciesOptions, statusOptions } from 'common/constants/constants';

type Props = {
  id: number
  image?: string
  name: string
  location: {
    name: string
    url?: string
  }
  status: StatusFilterType
  species: SpeciesFilterType
  gender: GenderFilterType
  description: string
  onClose: () => void
};

type FormValues = {
  name: string
  status: StatusFilterType
  species: SpeciesFilterType
  gender: GenderFilterType
  locationName: string
  locationUrl: string
  image: string
  description: string
};

export const EditCharacterForm = ({
  id,
  image,
  name,
  location,
  status,
  species,
  description,
  onClose,
}: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: name,
      status: status,
      species: species,
      locationName: location.name,
      locationUrl: location.url,
      image: image,
      description: description,
    },
  });
  
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedCharacter = {
      id: id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      location: {
        name: data.locationName,
        url: data.locationUrl,
      },
      image: data.image,
      description: data.description,
    };

    dispatch(updateCharacter(updatedCharacter));
    reset();
    onClose();
  };

  return (
    <Form 
      formTitle="Edit Character Form" 
      onSubmit={handleSubmit(onSubmit)} 
      buttonTitle="Update Character"
    >
      <InputGroup
        label="Status"
        register={register('status', { required: 'This field is required' })}
        error={errors.status?.message}
        type="select"
        options={statusOptions}
        required
      />
      <InputGroup
        label="Gender"
        type="select"
        register={register('gender', { required: 'This field is required' })}
        error={errors.gender?.message}
        options={genderOptions}
        required
      />
      <InputGroup
        label="Species"
        type="select"
        register={register('species', { required: 'This field is required' })}
        error={errors.species?.message}
        options={speciesOptions}
        required
      />
      <InputGroup
        label="Name"
        type="text"
        register={register('name', { required: 'This field is required' })}
        error={errors.name?.message}
        required
      />
      <InputGroup
        label="Location Name"
        type="text"
        register={register('locationName', { required: 'This field is required' })}
        error={errors.locationName?.message}
        required
      />
      <InputGroup
        label="Location URL"
        type="text"
        register={register('locationUrl')}
      />
      <InputGroup
        label="Image URL"
        type="text"
        register={register('image', { required: 'This field is required' })}
        error={errors.image?.message}
        required
      />
      <InputGroup
        label="Description"
        register={register('description', { required: 'This field is required' })}
        error={errors.description?.message}
        type="textarea"
        required
      />
    </Form>
  );
};
